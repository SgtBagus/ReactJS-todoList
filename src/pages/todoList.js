import React, { PureComponent, createRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import update from 'immutability-helper';

import Items from '../components/Items';
import InputText from '../components/InputText';
import Select from '../components/Select';

import { STATUS_TYPE, STATUS_LIST, SUBMIT_STATUS } from '../enum/status';

export default class TodoList extends PureComponent {
    notificationSystem = createRef();

    constructor(props) {
        super(props);

        this.state = {
            form: {
                id: '',
                item: '',
                statusValue: '',
            },
            todoList: [],
            submitStatus: SUBMIT_STATUS.SAVE,
        };
    }

    componentDidMount = async () => {
        this.setState({
            todoList: [
                {
                    id: '1',
                    value: 'Gary Goodspeed',
                    status: STATUS_TYPE.ACTIVE,
                },
                {
                    id: '2',
                    value: 'Little Cato',
                    status: STATUS_TYPE.COMPLETE,
                },
                {
                    id: '3',
                    value: 'KVN',
                    status: STATUS_TYPE.URGENT,
                },
                {
                    id: '4',
                    value: 'Mooncake',
                    status: STATUS_TYPE.ACTIVE,
                },
                {
                    id: '5',
                    value: 'Quinn Ergon',
                    status: STATUS_TYPE.URGENT,
                },
            ],
        })
    }

    handleOnDragEnd = (result) => {
        const { todoList } = this.state;

        if (!result.destination) return;
    
        const newItems = todoList;
        const [reorderedItem] = todoList.splice(result.source.index, 1);

        newItems.splice(result.destination.index, 0, reorderedItem);
        this.setState({
            todoList: newItems,
        })
    }

    
    _changeInputHandler = async (type, val, e) => {
        const { form } = this.state;

        const newForm = update(form, {
            [type]: { $set: val },
        });

        this.setState({
            form: newForm,
        });
    };

    submitHandel = (action = SUBMIT_STATUS.SAVE) => {
        const {
            form: {
                item, statusValue,
            },
        } = this.state;

        try {
            if (item === '' && statusValue === '') throw new Error("To Do List and Stauts Can't be empty");

            if (action === SUBMIT_STATUS.EDIT) {
                this.editToDo();
            } else {
                this.addToDo();
            }
        } catch (err) {
            alert(err);
        }
    }

    addToDo = () => {
        const {
            form: {
                item, statusValue,
            }, todoList,
        } = this.state;

        const getLastIndex = todoList.length + 1;

        const newTodoList = update(todoList, {
            $push: [{
                id: getLastIndex.toString(),
                value: item,
                status: statusValue,
            }],
        });

        this.setState({
            todoList: newTodoList,
            form: {
                id: '',
                item: '',
                statusValue: '',
            },
            submitStatus: SUBMIT_STATUS.SAVE,
        });
    }

    editToDo = () => {
        const {
            form: {
                id, item, statusValue,
            }, todoList,
        } = this.state;

        const newTodoList = todoList.map((x) => {
            let dataReturn = x;
            if (x.id === id) {        
                dataReturn = update(x, {
                    value: { $set: item },
                    status: { $set: statusValue },
                });
            }

            return dataReturn;
        })

        this.setState({
            todoList: newTodoList,
            form: {
                id: '',
                item: '',
                statusValue: '',
            },
            submitStatus: SUBMIT_STATUS.SAVE,
        });
    }

    editHandel = (idValue) => {
        const { todoList } = this.state;

        const { id, value, status } = todoList.find(({id}) => (id === idValue));
        this.setState({
            form: {
                id,
                item: value,
                statusValue: status,
            },
            submitStatus: SUBMIT_STATUS.EDIT,
        });
    }

    completeHandel = (idValue, val) => {
        const { todoList } = this.state;

        const newTodoList = todoList.map((x) => {
            let dataReturn = x;
            if (x.id === idValue) {        
                dataReturn = update(x, {
                    status: { $set: val ? STATUS_TYPE.COMPLETE : STATUS_TYPE.ACTIVE }
                });
            }

            return dataReturn;
        })

        this.setState({
            todoList: newTodoList,
        });
    }

    deleteHandel = (idValue) => {
        const { todoList } = this.state;

        const newTodoList = todoList.filter((x) => x.id !== idValue);

        this.setState({
            todoList: newTodoList,
        });
    }

    render() {
        const {
            form: {
                item, statusValue,
            }, todoList, submitStatus,
        } = this.state;

        return (
            <div className="row justify-content-md-center">
                <div className="col-md-6">
                    <div className="row">
                        <div className="col-md-5">
                            <InputText
                                value={item}
                                name="inputList"
                                changeEvent={(val) => this._changeInputHandler('item', val)}
                                placeholder="Input your ToDo to List"
                                required={false}
                                disabled={false}
                            />
                        </div>
                        <div className="col-md-5">
                            <Select
                              data={STATUS_LIST}
                              value={statusValue}
                              changeEvent={(val) => this._changeInputHandler('statusValue', val)}
                              name="Status"
                              placeholder="Select Status"
                            />
                        </div>
                        <div className="col-md-2">
                            <button
                                type="button"
                                className={`btn w-100 ${submitStatus === SUBMIT_STATUS.EDIT ? 'btn-warning' : 'btn-primary'}`}
                                onClick={() => {this.submitHandel(submitStatus)
                                }}
                            >
                                {
                                    submitStatus === SUBMIT_STATUS.EDIT ? 'Edit' : 'Save'
                                }
                            </button>
                        </div>
                    </div>

                    <DragDropContext onDragEnd={this.handleOnDragEnd}>
                        <Droppable droppableId="todoList">
                            {(provided) => (
                                <div 
                                    className="characters"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    style={{
                                        maxHeight: '80vh',
                                        overflow: 'auto',
                                    }}
                                >
                                    {todoList.map(({id, value, status}, index) => {
                                        return (
                                            <Draggable key={id} draggableId={id} index={index}>
                                                {(provided) => (
                                                    <div className="my-3" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                        <Items
                                                            value={value}
                                                            status={status}
                                                            editHandel={() => { this.editHandel(id) }}
                                                            completeHandel={(val) => { this.completeHandel(id, val) }}
                                                            deleteHandel={() => { this.deleteHandel(id) }}
                                                        />
                                                    </div>
                                                )}
                                            </Draggable>
                                        );
                                    })}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                    <div className="row">
                        <div className="col-md-12 d-flex flex-column justify-content-end align-items-end">
                            <h2 style={{color: 'white' }}>
                                <span className="fw-bold">{todoList.filter((x) => x.status === STATUS_TYPE.COMPLETE).length}</span>
                                <small style={{ fontSize: '15px' }}> Todo Complete </small>
                            </h2>
                            <h2 style={{color: 'white' }}>
                                <span className="fw-bold">{todoList.length}</span>
                                <small style={{ fontSize: '15px' }}> Todo Total </small>
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

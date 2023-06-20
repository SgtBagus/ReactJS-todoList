import React from 'react';
import { COLOR_CODE_STATUS, STATUS_TYPE } from '../enum/status';

const statusHandle = (status) => {
    let codeColor = COLOR_CODE_STATUS.ACTIVE;

    if(status === STATUS_TYPE.COMPLETE) {
        codeColor = COLOR_CODE_STATUS.COMPLETE;
    } else if (status === STATUS_TYPE.URGENT) {
        codeColor = COLOR_CODE_STATUS.URGENT;
    }

    return codeColor;
}

const renderBadge = (status) => {
    let codeColor = (<span className="badge rounded-pill bg-primary">Aktif</span>);

    if(status === STATUS_TYPE.COMPLETE) {
        codeColor = (<span className="badge rounded-pill bg-success">Complete</span>);
    } else if (status === STATUS_TYPE.URGENT) {
        codeColor = (<span className="badge rounded-pill bg-danger">Urgent</span>);
    }

    return codeColor;
}

const Items = (props) => {
    const { 
        value, status, editHandel, completeHandel, deleteHandel, 
    } = props;

    const codeColor = statusHandle(status);
    const badge = renderBadge(status);

    return (
        <div className="card rounded-3 border-3 border-white" style={{ backgroundColor: codeColor, color: 'white' }}>
            <div className="card-body d-flex justify-content-between align-items-center">
                <p
                    className={`fw-bold m-0 ${status === STATUS_TYPE.COMPLETE && 'text-decoration-line-through'}`}
                    style={{ fontSize: '18px' }}
                >
                    {value}
                    {' '}
                    {badge}
                </p>
                <div className='ms-3 d-flex'>
                    {
                        status === STATUS_TYPE.COMPLETE ? (
                            <i className="fa fa-close" onClick={() => { completeHandel(false) }} style={{ cursor: 'pointer' }} />
                        ) : (
                            <i className="fa fa-check" onClick={() => { completeHandel(true) }} style={{ cursor: 'pointer' }} />
                        )
                    }
                    <i className="fa fa-edit mx-2" onClick={editHandel} style={{ cursor: 'pointer' }} />
                    <i className="fa fa-trash" onClick={deleteHandel} style={{ cursor: 'pointer' }} />
                </div>
            </div>
        </div>
    );
};

export default Items;

const STATUS_TYPE = {
    ACTIVE: 'active',
    URGENT: 'urgent',
    COMPLETE: 'complete',
};

const COLOR_CODE_STATUS = {
    ACTIVE: '#11468F',
    URGENT: '#990000',
    COMPLETE: '#A9A9A9',
};

const STATUS_LIST = [
    {
        value: STATUS_TYPE.ACTIVE,
        name: 'Aktif',
    },
    {
        value: STATUS_TYPE.URGENT,
        name: 'Urgent',
    },
];

export const SUBMIT_STATUS = {
    SAVE: 'save',
    EDIT: 'edit',
}

export {
    STATUS_TYPE, COLOR_CODE_STATUS, STATUS_LIST,
};

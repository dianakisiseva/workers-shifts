export const STATUS = {
    COMPLETE: 1,
    PENDING: 2,
    PROCESSING: 3,
    FAILED: 4
}

export const STATUSES = {
    [STATUS.COMPLETE]:'Complete',
    [STATUS.PENDING]: 'Pending',
    [STATUS.PROCESSING]: 'Processing',
    [STATUS.FAILED]: 'Failed'

}

export const SHIFT = {
    DAY_SHIFT: 1,
    NIGHT_SHIFT: 2,
    HOLIDAY: 3,
}

export const SHIFTS = {
    [SHIFT.DAY_SHIFT]:'Day',
    [SHIFT.NIGHT_SHIFT]: 'Night',
    [SHIFT.HOLIDAY]: 'Holiday'
}

import R from 'ramda'

export const getTableValue = (x, y, table) => R.path([y, x])(table)

export const createTable = (x, y) => {
    return R.pipe(
        R.repeat(""),
        R.repeat(R.__, y)
    )(x)
}

export const updateTable = (x, y, table, value) => R.assocPath([y, x], value)(table)


export const saveTable = (x,y,x1,y1,x2,y2,table) => {
    const value = getTableValue(x,y,table)
    const value1 = getTableValue(x1,y1,table)
    if(value&&value1){
       return updateTable(x2, y2, table, value1 + value)
    }
    return false
    
}

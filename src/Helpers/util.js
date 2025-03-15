export const searchFilter = (list, value,key)=> {
    return list.filter(x => new RegExp(value, "i").test(Object.values(x[key])));
  }
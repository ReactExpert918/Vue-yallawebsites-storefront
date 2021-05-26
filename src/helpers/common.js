

export function copyArrayOfObjects(arr) {
    var copyArr = JSON.parse(JSON.stringify(arr));
    return copyArr;
}
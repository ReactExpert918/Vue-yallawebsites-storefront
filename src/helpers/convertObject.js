import formatDate from "./FormatDate";

export default function convert(data) {
    return data.map(item => {
        var temp = Object.assign({}, item);
        temp.created_at = formatDate(item.created_at);
        temp.updated_at = formatDate(item.updated_at);
        return temp;
    });
}
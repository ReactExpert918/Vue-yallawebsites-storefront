import formatDate from "./FormatDate";

export default function convert(data) {
    return data.map(item => {
        var temp = Object.assign({}, item);
        temp.created_at = formatDate(item.created_at);
        if(temp.order) {
            temp.order.created_at = formatDate(item.order.created_at);
        }
        if(temp.updated_at) {
            temp.updated_at = formatDate(item.updated_at);
        }
        return temp;
    });
}
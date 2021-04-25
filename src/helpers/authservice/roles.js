
import { getLoggedInUser } from './user.service';


export const roleAdmin = "admin",
    roleEditor = "editor";

export const roleService = {
    hasCreatePermission,
    hasEditPermission,
    hasDeletePermission,
}



function hasCreatePermission(pageName) {
    var user = getLoggedInUser();
    if (!(user.role)) {
        return false;
    }
    if (user.role.slug != roleAdmin) {
        return false;
    }
    for (var i = 0; i < user.role.contents.length; i++) {
        var content = user.role.contents[i];
        if (content.slug == pageName) {
            return true;
        }
    }

    return false;
}


function hasEditPermission(pageName) {
    var user = getLoggedInUser();
    if (!(user.role)) {
        return false;
    }
    if (user.role.slug != roleEditor || user.role.slug != roleAdmin) {
        return false;
    }
    for (var i = 0; i < user.role.contents.length; i++) {
        var content = user.role.contents[i];
        if (content.slug == pageName) {
            return true;
        }
    }

    return false;
}

function hasDeletePermission(pageName) {
    return hasCreatePermission(pageName);
}
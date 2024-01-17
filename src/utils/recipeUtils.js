const checkPermission = (checkFunction, currentStatus, newStatus) => {
    if (!checkFunction({ before: currentStatus, after: newStatus })) {
        throw {
            status: 403,
            message: 'Bạn không có quyền truy cập vào tài nguyên này'
        };
    }
};


const checkChangingRecipeStatusByUser = ({ before, after }) => {
    return (before === 'Approved' && (after === 'Hidden' || after === 'Deleted'))
        || (before === 'Hidden' && (after === 'Approved' || after === 'Deleted'))
        || (before === 'Rejected' && after === 'Pending')
        || (before === 'Rejected' && after === 'Deleted')
        || (before === 'Pending' && after === 'Deleted')
}

const checkChangingRecipeStatusByAdmin = ({ before, after }) => {
    return (before === 'Pending' && (after === 'Approved' || after === 'Rejected'))
}

const checkChangingRecipeStatusByAuthorWhoIsAdmin = ({ before, after }) => {
    return checkChangingRecipeStatusByAdmin({ before, after }) || checkChangingRecipeStatusByUser({ before, after })
}

module.exports = {
    checkChangingRecipeStatusByAdmin,
    checkChangingRecipeStatusByUser,
    checkChangingRecipeStatusByAuthorWhoIsAdmin,
    checkPermission
}
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
}

const checkChangingRecipeStatusByAdmin = ({ before, after }) => {
    return (before === 'Pending' && (after === 'Approved' || after === 'Rejected'))
}

module.exports = {
    checkChangingRecipeStatusByAdmin,
    checkChangingRecipeStatusByUser,
    checkPermission
}
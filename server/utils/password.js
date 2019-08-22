const utility = require("utility");

module.exports = function (pwd) {
    const salt = "dongminghui12_adfajzvu123!#$/.JHAS";
    return utility.md5(salt+utility.md5(pwd));
};
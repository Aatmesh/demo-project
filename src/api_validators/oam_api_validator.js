let messages = require("../../config/messages.js");
let status_codes = require("../../config/response_status_codes.js");
let Common_functions = require("../core/common_functions.js");
let common_functions = new Common_functions();

module.exports.check_api_validation = async function (req, res, next) {
    let user_Token = req.header("USER_TOKEN");
    if (req.url !== "/api/oam/login" &&
        req.url !== "/api/oam/verify_otp" &&
        req.url !== "/api/oam/resend_otp" &&
        req.url !== "/api/oam/save_password" &&
        req.url !== "/api/oam/reset_password" && 
        req.url !== "/api/oam/generate_otp_forgot_password") {
            
        if (user_Token === "" || user_Token === null || user_Token === undefined) {
            res.json({
                status: false,
                status_code: status_codes.user_invalid_token,
                message: messages.user_invalid_token
            })
        } else {
                let token_data = await common_functions.verify_token(user_Token);
                if (token_data.token_info == undefined) {
                    if (token_data.err.name == 'TokenExpiredError')
                        return res.json({
                            status: false,
                            status_code: status_codes.session_timeout,
                            message: messages.session_timeout
                        });
                    return res.json({
                        status: false,
                        status_code: status_codes.user_invalid_token,
                        message: messages.user_invalid_token
                    });
                }
                else {
                    req['oam_id'] = token_data.token_info['oam_id'];
                    next();
                }
        }
    } else {
        next();
    }
};
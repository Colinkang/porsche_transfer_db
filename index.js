
const { address } = require('./models/address');
const { advice } = require('./models/advice');
const { article } = require('./models/article');
const { article_comment } = require('./models/article_comment');
const { car } = require('./models/car');
const { comment_upvote } = require('./models/comment_upvote');
const { dealer } = require('./models/dealer');
const { member } = require('./models/member');
const { member_action } = require('./models/member_action');
const { member_login_history } = require('./models/member_login_history');
const { member_update_info_history } = require('./models/member_update_info_history');
const { notification } = require('./models/notification');
const { picture } = require('./models/picture');
const { porsche_center } = require('./models/porsche_center');

(async function () {
    await address();
    await advice();
    await article();
    await article_comment();
    await car();
    await comment_upvote();
    await dealer();
    await member();
    await member_action();
    await member_login_history();
    await member_update_info_history();
    await notification();
    await picture();
    await porsche_center();
}());
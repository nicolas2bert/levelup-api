/*const data = require('../../data.json')

module.exports = data.users;*/

const uuid = require('uuid');

function User(data){
	this._id = data._id || null;
	this.name = data.name || null;
	return this
}

User.prototype = {
	get: function(val){
		return this[val]; 
	},
	set: function(val,data){
		this[val] = data;
	}
}

exports.create = function(req,res){
	const user = req.body;
	const id = uuid.v1();
	const u = new User(user);
	u.set('_id',id)
	console.log(u);
	res.json({'success': 'User successfully created!', 'data': u});
}
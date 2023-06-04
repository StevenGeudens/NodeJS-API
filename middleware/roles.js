function admin(req, res, next){
    console.log(req.user);
    if(!req.user.roles.includes("admin")) return res.status(403).send({error:"Access Denied"});
    next();
}

function user(req, res, next) {
    console.log(req.user);
    if(!req.user.roles.includes("user")) return res.status(403).send({error:"Access Denied"});
    next();
}
module.exports = {admin, user};
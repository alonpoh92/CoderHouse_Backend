const isLogged = (req, res, next) => {
    if(req.session){
        return next();
    }else{
        return res.status(401).redirect('login.html');
    }
}
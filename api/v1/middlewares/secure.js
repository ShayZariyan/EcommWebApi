module.exports=(req,res,next)=>{
    {
        let arrips=["::ffff:127.0.0.1","192.168.15.24"];
        for(let i=0;i<arrips.length;i++)
        {
            console.log(`IP Requesting : ${req.ip}`);
            if(req.ip==arrips[i])
            {
                return next();
            }
        }
        return res.status(401).json({Msg:`Not Authorized`});
    }
};
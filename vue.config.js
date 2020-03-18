module.exports = {
    devServer: {
        port: 9000,
        open: true,
        // before:(app) =>{
        //     app.get("/home/getData",(req,res)=>{
        //         res.json({
        //             "home":"test home"
        //         })
        //     })
        // },
    },
    css: {
        loaderOptions: {
            stylus: {
                import: '~@/assets/css/variables.styl',
                // globalVars: {
                //     primary_bg: '#f00'
                // }
            }
        }
    }
}
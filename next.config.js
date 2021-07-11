// noinspection JSUnusedGlobalSymbols

module.exports = {

    async rewrites() {

        return [{
            source: "/api/:path*",
            destination: "https://salesloft-server-wpxep.ondigitalocean.app/api/:path*"
        }]
    }

}

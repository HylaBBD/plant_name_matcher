module.exports.router = function () {
    let routes = []
    return {
        register: (path, method, cb) => {
            routes.push({
                path: path.substr(1).split("/").map(element => new RegExp(`^${element}$`)),
                method: method,
                function: cb
            })
        },
        getRoute: (requestPath, requestMethod) => {
            const pathArray = requestPath.substr(1).split("/")
            return routes.find(({path, method}) => {
                return method === requestMethod && path.length == pathArray.length && path.every((element, index) => {
                    return element.test(pathArray[index])
                })
            })
        }
    }
}
# vue-project

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## Deployment

Including Git configuration, uWSGI configuration, nginx configuration

### Git configuration

After creating a git repository for your project, you consider maintaining the code by git, developing code in the local workplace, and deploying it on your server.

#### Git quick setup

You may encounter such a situation that can't push your changes to the remote repository. It shows "error: src refspec master does not match any. "

Due to the recent "Replacing master with main in GitHub" action, you may notice that there is a `refs/heads/main`. As a result, the following command may change from `git push origin HEAD:master` to `git push origin HEAD:main`[](https://stackoverflow.com/questions/4181861/message-src-refspec-master-does-not-match-any-when-pushing-commits-in-git)

The other problem is you are required such as a [personal access token](https://docs.github.com/en/free-pro-team@latest/github/getting-started-with-github/set-up-git#next-steps-authenticating-with-github-from-git) for all authenticated Git operations on GitHub.com.

### Quickstart for Python/WSGI

Here[](https://flask.palletsprojects.com/en/2.1.x/deploying/uwsgi/) is introduction for uWSGI, installing pyuwsgi requires python3-devel head file for compile(uWSGI is a (big) C application, so you need a C compiler (like gcc or clang) and the Python development headers.). In Centos 7, the following command help you install python3-devel
```sh
yum search python3-devel
yum install python3-devel
pip install uwsgi # in venv
```

You can type following command to start wsgi.
```sh
uwsgi --http 0.0.0.0:5000 --master -p 4 -w hello:app
```
* Here option "--http" indicate that you use wsgi as a http server instead of proxy server
or
```sh
uwsgi uwsgi.ini
```
uwsgi.ini
```ini
[uwsgi]
http = 0.0.0.0:5000
chdir = /home/project/
wsgi-file = hello.py
callable = app
processes = 4
master = true
threads = 2
stats = 0.0.0.0:8080
daemonize = /home/project/log/mylog.log
```

#### Nginx

There is only one thing you need to consider, the router would confilct with nginx. You need to add following text to your nginx.config
```ini
location / {
    try_files $uri $uri/ /index.html?uri=$uri
}
```



from fabric.api import *

env.hosts = ['192.168.1.8']
env.port = '22'
env.user = 's1'
env.password = 's1'

# fab hello:a=11,b=22
def hello(a,b):
  print("hello world!{}-{}".format(a,b))
# 自动命令示例
def list(dir="/home/s1/zog_igame/frontend/bridge_gui"):
  with cd(dir):
    run('ls -l')
    run('exit')

# 自动部署
def deploy(app='igame'):
  eval("_"+app)()
  run('exit')

# 启动服务
def start():
  with cd("/opt/odoo/server"):
    sudo("service nginx stop")
    sudo("service nginx start")
    sudo("-u odoo ./odoo-bin -s")
    
def test():
  with cd("/opt/odoo/server"):
    sudo("service nginx stop")
    sudo("service nginx start")
    #sudo("su - odoo -s /bin/bash")
    sudo("-u odoo ./odoo-bin -s")



#################################################################
def _itable():
  with cd("/home/s1/gameLobby"):
    #run('git reset --hard HEAD')
    sudo('git checkout master')
    sudo('git pull origin master')
    #sudo('rm -rf build/')
    sudo('yarn install')
    sudo('yarn build')
    # sudo('rm -rf /var/www/bridge_bui1/itable')
    # sudo('cp -r dist/ /var/www/bridge_bui1/itable')


# 计划修改为软连接版本。
def _igame():
  with cd("/home/s1/zog_igame/frontend/bridge_gui"):
    #run('git reset --hard HEAD')
    sudo('git checkout bui-mobx-test1')
    sudo('git pull origin bui-mobx-test1')
    # sudo('rm -rf build/')
    sudo('yarn build')
    # sudo('rm -rf /var/www/bridge_bui1/igame')
    # sudo('mv build/ /var/www/bridge_bui1/igame')

def _imatch():
  with cd("/opt/odoo/zog_igame/fronend/imatch"):
    #sudo('git reset --hard HEAD')
    sudo('git checkout develop')
    sudo('git pull origin develop')
    sudo('yarn install')
    sudo('yarn build')



# 正常工作的版本。删除重新拷贝,已经用软连接版本替换了。
def _igame1():
  with cd("/home/s1/zog_igame/frontend/bridge_gui"):
    #run('git reset --hard HEAD')
    sudo('git pull origin bui-mobx-test1')
    sudo('rm -rf build/')
    sudo('yarn build')
    sudo('rm -rf /var/www/bridge_bui1/igame')
    sudo('mv build/ /var/www/bridge_bui1/igame')

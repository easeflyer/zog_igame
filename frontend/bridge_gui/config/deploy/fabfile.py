from fabric.api import *

env.hosts = ['192.168.1.8']
env.port = '22'
env.user = 's1'
env.password = 's1'

def hello():
  print("hello world!")
# 自动命令示例
def list():
  with cd('/home/s1/zog_igame/frontend/bridge_gui'):
    run('ls -l')
    sudo('ps -aux')
    run('exit')

# 自动部署示例


def deploy():
  with cd("/home/s1/zog_igame/frontend/bridge_gui"):
    run('git reset --hard HEAD')
    run('git pull origin bui-mobx-test1')
    sudo('rm -rf build/')
    sudo('yarn build')
    sudo('rm -rf /var/www/bridge_bui1/igame')
    sudo('mv build/ /var/www/bridge_bui1/igame')
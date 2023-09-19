function list_child_processes () {
    local ppid=$1;
    local current_children=$(pgrep -P $ppid);
    local local_child;
    if [ $? -eq 0 ];
    then
        for current_child in $current_children
        do
          local_child=$current_child;
          list_child_processes $local_child;
          echo $local_child;
        done;
    else
      return 0;
    fi;
}

ps 12243;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 12243 > /dev/null;
done;

for child in $(list_child_processes 13287);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/mainframe/RiderProjects/next_dotnet/next_dotnet/bin/Debug/net7.0/0240e50e4bf8410baed9164cc0ec4928.sh;

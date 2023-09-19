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

ps 19473;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 19473 > /dev/null;
done;

for child in $(list_child_processes 19506);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/mainframe/RiderProjects/next_dotnet/next_dotnet/bin/Debug/net7.0/f9941253e4144f43b0a79b9681613092.sh;

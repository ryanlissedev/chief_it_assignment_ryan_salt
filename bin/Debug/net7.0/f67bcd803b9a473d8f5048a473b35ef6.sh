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

ps 12036;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 12036 > /dev/null;
done;

for child in $(list_child_processes 12049);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/mainframe/RiderProjects/next_dotnet/next_dotnet/bin/Debug/net7.0/f67bcd803b9a473d8f5048a473b35ef6.sh;

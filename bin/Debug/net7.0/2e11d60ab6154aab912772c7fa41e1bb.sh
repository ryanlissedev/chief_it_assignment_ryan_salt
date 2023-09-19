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

ps 5929;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 5929 > /dev/null;
done;

for child in $(list_child_processes 5939);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/mainframe/RiderProjects/next_dotnet/next_dotnet/bin/Debug/net7.0/2e11d60ab6154aab912772c7fa41e1bb.sh;

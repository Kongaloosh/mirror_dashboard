screen -dm -S chrome -c "cd ~/mirror_dashboard; exec ./start_chrome.sh"
screen -dm -S dashboard -c "cd ~/mirror_dashboard; exec python mirror_dasboard.py"

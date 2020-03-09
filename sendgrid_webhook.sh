function localtunnel {
  lt -s dawydo2020 -p 5000
}
until localtunnel; do
echo "localtunnel server crashed"
sleep 2
done

// ./sendgrid_webhook.sh
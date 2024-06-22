# Build the Docker image
docker build -t agent-app-portal-uat:1.0.0 .

# Check if the container exists before attempting to stop and remove it
if [ "$(docker ps -q -f name=agent-app-portal-uat)" ]; then
    docker stop agent-app-portal-uat
    docker rm agent-app-portal-uat
fi

# Run the container
docker run --detach=true --name=agent-app-portal-uat --publish=3000:3000 agent-app-portal-uat:1.0.0

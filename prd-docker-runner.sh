# Build the Docker image
docker build -f DockerfileProd -t agent-app-portal-prod:v1.0.0 .

# Check if the container exists before attempting to stop and remove it
if [ "$(docker ps -q -f name=agent-app-portal-prod)" ]; then
    docker stop agent-app-portal-prod || true
    docker rm agent-app-portal-prod || true
fi

# Run the container
docker run --detach=true --name=agent-app-portal-prod --publish=4000:4000 agent-app-portal-prod:v1.0.0

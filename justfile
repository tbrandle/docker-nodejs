rebuild-images: prune build-server-image build-ui-image

prune: 
  @echo "y" | docker system prune

build-server-image:
  @echo "building server image"
  docker build -t resume-builder-backend .

build-ui-image: 
  @echo "building ui image"
  @cd ./ui && docker build -t resume-builder .
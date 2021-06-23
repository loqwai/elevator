FROM node:15.13.0-alpine3.13

RUN apk --no-cache add git bash zsh curl

# Install Oh My Zsh
RUN sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

CMD zsh

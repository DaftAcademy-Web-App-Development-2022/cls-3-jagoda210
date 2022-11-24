decrypt:
	openssl enc -aes-256-cbc -d -in .env.encrypted -out .env.decrypted && \
	openssl enc -aes-256-cbc -d -in .secrets.encrypted -out .secrets.decrypted
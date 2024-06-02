FROM mysql:8.0-debian

# Copy the dump file into the container
COPY dump.sql /docker-entrypoint-initdb.d/

# Set environment variables for MySQL
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=itsecwb
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=12345

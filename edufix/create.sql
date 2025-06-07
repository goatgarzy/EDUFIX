
    create table maintenance_requests (
        assignee_id bigint,
        date_submitted datetime(6),
        id bigint not null auto_increment,
        last_updated datetime(6),
        submitter_id bigint,
        work_completed datetime(6),
        work_started datetime(6),
        category varchar(255) not null,
        description varchar(255),
        location varchar(255) not null,
        notes varchar(255),
        request_id varchar(255) not null,
        title varchar(255) not null,
        priority enum ('HIGH','LOW','MEDIUM','URGENT'),
        status enum ('ASSIGNED','CANCELLED','COMPLETED','IN_PROGRESS','PENDING'),
        primary key (id)
    ) engine=InnoDB;

    create table roles (
        id bigint not null auto_increment,
        name enum ('ROLE_ADMIN','ROLE_FACULTY','ROLE_STAFF','ROLE_USER'),
        primary key (id)
    ) engine=InnoDB;

    create table user_roles (
        role_id bigint not null,
        user_id bigint not null,
        primary key (role_id, user_id)
    ) engine=InnoDB;

    create table users (
        id bigint not null auto_increment,
        registration_date datetime(6),
        updated_at datetime(6),
        certifications varchar(255),
        department varchar(255),
        email varchar(255) not null,
        employee_id varchar(255),
        experience varchar(255),
        first_name varchar(255) not null,
        last_name varchar(255) not null,
        password varchar(255) not null,
        phone varchar(255),
        specialization varchar(255),
        registration_status enum ('APPROVED','PENDING','REJECTED'),
        user_type enum ('ADMIN','FACULTY','STAFF'),
        primary key (id)
    ) engine=InnoDB;

    alter table users 
       add constraint UK6dotkott2kjsp8vw4d0m25fb7 unique (email);

    alter table maintenance_requests 
       add constraint FK_maintenance_assignee 
       foreign key (assignee_id) 
       references users (id);

    alter table maintenance_requests 
       add constraint FK_maintenance_submitter 
       foreign key (submitter_id) 
       references users (id);

    alter table user_roles 
       add constraint FKh8ciramu9cc9q3qcqiv4ue8a6 
       foreign key (role_id) 
       references roles (id);

    alter table user_roles 
       add constraint FKhfh9dx7w3ubf1co1vdev94g3f 
       foreign key (user_id) 
       references users (id);

    create table maintenance_requests (
        assignee_id bigint,
        date_submitted datetime(6),
        id bigint not null auto_increment,
        last_updated datetime(6),
        submitter_id bigint,
        work_completed datetime(6),
        work_started datetime(6),
        category varchar(255) not null,
        description varchar(255),
        location varchar(255) not null,
        notes varchar(255),
        request_id varchar(255) not null,
        title varchar(255) not null,
        priority enum ('HIGH','LOW','MEDIUM','URGENT'),
        status enum ('ASSIGNED','CANCELLED','COMPLETED','IN_PROGRESS','PENDING'),
        primary key (id)
    ) engine=InnoDB;

    create table roles (
        id bigint not null auto_increment,
        name enum ('ROLE_ADMIN','ROLE_FACULTY','ROLE_STAFF','ROLE_USER'),
        primary key (id)
    ) engine=InnoDB;

    create table user_roles (
        role_id bigint not null,
        user_id bigint not null,
        primary key (role_id, user_id)
    ) engine=InnoDB;

    create table users (
        id bigint not null auto_increment,
        registration_date datetime(6),
        updated_at datetime(6),
        certifications varchar(255),
        department varchar(255),
        email varchar(255) not null,
        employee_id varchar(255),
        experience varchar(255),
        first_name varchar(255) not null,
        last_name varchar(255) not null,
        password varchar(255) not null,
        phone varchar(255),
        specialization varchar(255),
        registration_status enum ('APPROVED','PENDING','REJECTED'),
        user_type enum ('ADMIN','FACULTY','STAFF'),
        primary key (id)
    ) engine=InnoDB;

    alter table users 
       add constraint UK6dotkott2kjsp8vw4d0m25fb7 unique (email);

    alter table maintenance_requests 
       add constraint FK_maintenance_assignee 
       foreign key (assignee_id) 
       references users (id);

    alter table maintenance_requests 
       add constraint FK_maintenance_submitter 
       foreign key (submitter_id) 
       references users (id);

    alter table user_roles 
       add constraint FKh8ciramu9cc9q3qcqiv4ue8a6 
       foreign key (role_id) 
       references roles (id);

    alter table user_roles 
       add constraint FKhfh9dx7w3ubf1co1vdev94g3f 
       foreign key (user_id) 
       references users (id);

    create table maintenance_requests (
        assignee_id bigint,
        date_submitted datetime(6),
        id bigint not null auto_increment,
        last_updated datetime(6),
        submitter_id bigint,
        work_completed datetime(6),
        work_started datetime(6),
        category varchar(255) not null,
        description varchar(255),
        location varchar(255) not null,
        notes varchar(255),
        request_id varchar(255) not null,
        title varchar(255) not null,
        priority enum ('HIGH','LOW','MEDIUM','URGENT'),
        status enum ('ASSIGNED','CANCELLED','COMPLETED','IN_PROGRESS','PENDING'),
        primary key (id)
    ) engine=InnoDB;

    create table roles (
        id bigint not null auto_increment,
        name enum ('ROLE_ADMIN','ROLE_FACULTY','ROLE_STAFF','ROLE_USER'),
        primary key (id)
    ) engine=InnoDB;

    create table user_roles (
        role_id bigint not null,
        user_id bigint not null,
        primary key (role_id, user_id)
    ) engine=InnoDB;

    create table users (
        id bigint not null auto_increment,
        registration_date datetime(6),
        updated_at datetime(6),
        certifications varchar(255),
        department varchar(255),
        email varchar(255) not null,
        employee_id varchar(255),
        experience varchar(255),
        first_name varchar(255) not null,
        last_name varchar(255) not null,
        password varchar(255) not null,
        phone varchar(255),
        specialization varchar(255),
        registration_status enum ('APPROVED','PENDING','REJECTED'),
        user_type enum ('ADMIN','FACULTY','STAFF'),
        primary key (id)
    ) engine=InnoDB;

    alter table users 
       add constraint UK6dotkott2kjsp8vw4d0m25fb7 unique (email);

    alter table maintenance_requests 
       add constraint FK_maintenance_assignee 
       foreign key (assignee_id) 
       references users (id);

    alter table maintenance_requests 
       add constraint FK_maintenance_submitter 
       foreign key (submitter_id) 
       references users (id);

    alter table user_roles 
       add constraint FKh8ciramu9cc9q3qcqiv4ue8a6 
       foreign key (role_id) 
       references roles (id);

    alter table user_roles 
       add constraint FKhfh9dx7w3ubf1co1vdev94g3f 
       foreign key (user_id) 
       references users (id);

    create table maintenance_requests (
        assignee_id bigint,
        date_submitted datetime(6),
        id bigint not null auto_increment,
        last_updated datetime(6),
        submitter_id bigint,
        work_completed datetime(6),
        work_started datetime(6),
        category varchar(255) not null,
        description varchar(255),
        location varchar(255) not null,
        notes varchar(255),
        request_id varchar(255) not null,
        title varchar(255) not null,
        priority enum ('HIGH','LOW','MEDIUM','URGENT'),
        status enum ('ASSIGNED','CANCELLED','COMPLETED','IN_PROGRESS','PENDING'),
        primary key (id)
    ) engine=InnoDB;

    create table roles (
        id bigint not null auto_increment,
        name enum ('ROLE_ADMIN','ROLE_FACULTY','ROLE_STAFF','ROLE_USER'),
        primary key (id)
    ) engine=InnoDB;

    create table user_roles (
        role_id bigint not null,
        user_id bigint not null,
        primary key (role_id, user_id)
    ) engine=InnoDB;

    create table users (
        id bigint not null auto_increment,
        registration_date datetime(6),
        updated_at datetime(6),
        certifications varchar(255),
        department varchar(255),
        email varchar(255) not null,
        employee_id varchar(255),
        experience varchar(255),
        first_name varchar(255) not null,
        last_name varchar(255) not null,
        password varchar(255) not null,
        phone varchar(255),
        specialization varchar(255),
        registration_status enum ('APPROVED','PENDING','REJECTED'),
        user_type enum ('ADMIN','FACULTY','STAFF'),
        primary key (id)
    ) engine=InnoDB;

    alter table users 
       add constraint UK6dotkott2kjsp8vw4d0m25fb7 unique (email);

    alter table maintenance_requests 
       add constraint FK_maintenance_assignee 
       foreign key (assignee_id) 
       references users (id);

    alter table maintenance_requests 
       add constraint FK_maintenance_submitter 
       foreign key (submitter_id) 
       references users (id);

    alter table user_roles 
       add constraint FKh8ciramu9cc9q3qcqiv4ue8a6 
       foreign key (role_id) 
       references roles (id);

    alter table user_roles 
       add constraint FKhfh9dx7w3ubf1co1vdev94g3f 
       foreign key (user_id) 
       references users (id);

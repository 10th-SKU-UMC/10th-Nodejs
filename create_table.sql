-- 1. DB 생성
CREATE DATABASE umc_10th;

-- 2. DB 선택
USE umc_10th;

-- 3. user 테이블 생성
CREATE TABLE user (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255),
  name VARCHAR(255),
  password VARCHAR(255),
  age INT,
  address VARCHAR(255),
  detail_address VARCHAR(255),
  phone_number VARCHAR(20),
  gender ENUM('남성', '여성'),
  birth DATE
);

-- 4. food_category 테이블 생성
CREATE TABLE food_category (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

-- 5. user_favor_category 테이블 생성
CREATE TABLE user_favor_category (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT,
  food_category_id INT,
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (food_category_id) REFERENCES food_category(id)
);

-- 6. food_category 테스트 데이터 삽입 (preferences에 넣을 1,2,3,4,5)
INSERT INTO food_category (name) VALUES
  ('한식'),
  ('중식'),
  ('일식'),
  ('양식'),
  ('분식');

  SHOW DATABASES;

  CREATE TABLE stores (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    region VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL
);

CREATE TABLE reviews (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    store_id BIGINT NOT NULL,
    score INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE missions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    store_id BIGINT NOT NULL,
    title VARCHAR(100) NOT NULL,
    reward INT NOT NULL,
    deadline DATE
);

CREATE TABLE user_missions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    mission_id BIGINT NOT NULL,
    status VARCHAR(30) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

USE umc_10th;
SELECT * FROM stores;
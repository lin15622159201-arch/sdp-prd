ALTER TABLE inspiration
ADD COLUMN style_code VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '风格code',
ADD COLUMN style_name VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '风格name',
ADD COLUMN age_code VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '年龄code',
ADD COLUMN age_name VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '年龄name',
ADD COLUMN popular_code VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '爆款code',
ADD COLUMN popular_name VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '爆款name';
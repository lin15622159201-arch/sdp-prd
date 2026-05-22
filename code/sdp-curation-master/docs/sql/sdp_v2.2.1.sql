ALTER TABLE `sdp_curation`.`style_on_shelves`
    ADD COLUMN `latest_push_time` datetime NULL COMMENT '最近一次操作发布商品时间' AFTER `message`;




update style_on_shelves s left join
    (SELECT t.style_id,t.on_shelves_time
    FROM (
    SELECT *,
    ROW_NUMBER() OVER (
    PARTITION BY p.style_id
    ORDER BY p.on_shelves_time desc
    ) AS rn
    FROM product p
    ) t
    WHERE rn = 1) tt on s.style_id = tt.style_id
    set s.latest_push_time = tt.on_shelves_time
where tt.on_shelves_time is not null;
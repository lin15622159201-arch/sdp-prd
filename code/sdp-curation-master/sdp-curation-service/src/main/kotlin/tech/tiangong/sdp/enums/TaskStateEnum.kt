package tech.tiangong.sdp.enums

import tech.tiangong.butted.common.enums.TaskStatusEnum

/**
 * 任务状态
 * -1已提交, 0-排队中；10-生成中；20-已中止；30-已完成；50-生成失败
 * @author zjh
 * @date 2024/9/5 10:09
 */
enum class TaskStateEnum(
    val code: Int,
    val desc: String,
    val taskStateEnums: List<TaskStatusEnum>,
) {

    /**
     * 已提交
     */
    SUBMIT(-1, "已提交", listOf()),

    /**
     * 排队中
     */
    QUEUEING(0, "排队中", listOf(TaskStatusEnum.QUEUEING)),

    /**
     * 生成中
     */
    GENERATING(10, "生成中", listOf(TaskStatusEnum.GENERATING)),

    /**
     * 已中止
     */
    ABORTED(20, "已中止", listOf(TaskStatusEnum.CANCELED)),

    /**
     * 已生成
     */
    COMPLETED(30, "已生成", listOf(TaskStatusEnum.COMPLETED)),

    /**
     * 生成失败
     */
    FAILED(50, "生成失败", listOf(TaskStatusEnum.FAILED, TaskStatusEnum.TIMEOUT_FAILED)),
    ;

    companion object {
        /**
         * 根据code获取枚举
         */
        fun getByCode(code: Int): TaskStateEnum? {
            return entries.find { it.code == code }
        }

        /**
         * 根据taskStateEnums的code匹配出当前枚举
         */
        fun getByTaskStatusEnum(taskStatusEnum: TaskStatusEnum): TaskStateEnum? {
            return entries.find { it.taskStateEnums.contains(taskStatusEnum) }
        }

        /**
         * 判断是否为终态
         */
        fun isFinish(code: Int?): Boolean {
            if (code == null) {
                return false
            }
            return listOf(ABORTED, COMPLETED, FAILED).contains(getByCode(code))
        }

        /**
         * 获取非终态类型
         */
        fun getEnumByNoFinish(): List<TaskStateEnum> {
            return entries.filter { !isFinish(it.code) }
        }

    }
}
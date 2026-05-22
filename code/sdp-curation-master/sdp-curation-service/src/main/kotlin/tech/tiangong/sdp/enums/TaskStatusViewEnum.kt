package tech.tiangong.sdp.enums

import tech.tiangong.butted.common.enums.TaskStatusEnum

/**
 * 任务状态(展示|筛选)
 * 0-排队中；10-生成中；20-已中止；30-已完成；50-失败；60-超时失败；
 */
enum class TaskStatusViewEnum(val desc: String, val aiTaskStatusList: List<TaskStatusEnum>) {

    /**
     * 排队中
     */
    QUEUEING("排队中", listOf(TaskStatusEnum.QUEUEING)),

    /**
     * 生成中
     */
    GENERATING("生成中", listOf(TaskStatusEnum.GENERATING)),

    /**
     * 已生成
     */
    COMPLETED("已生成", listOf(TaskStatusEnum.COMPLETED)),

    /**
     * 已中止
     */
    ABORTED("已中止", listOf(TaskStatusEnum.CANCELED)),

    /**
     * 生成失败
     */
    FAILED("生成失败", listOf(TaskStatusEnum.FAILED, TaskStatusEnum.TIMEOUT_FAILED)),

    ;


    fun processing(): Boolean {
        return this.aiTaskStatusList.any { processing(it.code) }
    }

    fun aborted(): Boolean {
        return this.aiTaskStatusList.any { aborted(it.code) }
    }

    fun completed(): Boolean {
        return this.aiTaskStatusList.any { completed(it.code) }
    }

    fun failed(): Boolean {
        return this.aiTaskStatusList.any { failed(it.code) }
    }

    fun failedOrAborted(): Boolean {
        return this.aiTaskStatusList.any { failedOrAborted(it.code) }
    }

    fun finished(): Boolean {
        return this.aiTaskStatusList.any { finished(it.code) }
    }


    /**
     * 是否可中止
     */
    fun abortEnable(): Boolean {
        return this.aiTaskStatusList.any { abortEnable(it.code) }
    }

    /**
     * 是否可重试
     */
    fun retryEnable(): Boolean {
        return this.aiTaskStatusList.any { retryEnable(it.code) }
    }

    /**
     * 获取aigc codes
     */
    fun getAigcCodes(): List<Int> {
        return aiTaskStatusList.map { it.code }.toMutableList()
    }

    companion object {


        fun ofCode(code: Int): TaskStatusViewEnum {
            return entries.firstOrNull { it.aiTaskStatusList.contains(TaskStatusEnum.of(code)) }
                ?: throw IllegalArgumentException("TaskStateWebEnum not found by code $code")
        }


        /**
         * 根据aigcTaskState code 判断是否过程状态
         * @return true:是过程状态, false:非过程状态
         */
        @JvmStatic
        fun processing(code: Int?): Boolean {
            return (QUEUEING.aiTaskStatusList + GENERATING.aiTaskStatusList)
                .any { it.code == code }
        }

        @JvmStatic
        fun aborted(code: Int?): Boolean {
            return ABORTED.aiTaskStatusList.any { it.code == code }
        }

        @JvmStatic
        fun completed(code: Int?): Boolean {
            return COMPLETED.aiTaskStatusList.any { it.code == code }
        }

        @JvmStatic
        fun failed(code: Int?): Boolean {
            return FAILED.aiTaskStatusList.any { it.code == code }
        }

        @JvmStatic
        fun failedOrAborted(code: Int?): Boolean {
            return failed(code) || aborted(code)
        }

        @JvmStatic
        fun finished(code: Int?): Boolean {
            return aborted(code)
                    || completed(code)
                    || failed(code)
        }


        /**
         * 是否可中止
         */
        fun abortEnable(code: Int): Boolean {
            return processing(code)
        }

        /**
         * 是否可重试
         */
        fun retryEnable(code: Int): Boolean {
            return failedOrAborted(code)
        }


        /**
         * 中止编码
         */
        fun abortCode(): Int {
            return TaskStatusEnum.CANCELED.code
        }
        /**
         * 失败编码
         */
        fun failedCode(): Int {
            return TaskStatusEnum.FAILED.code
        }


        fun getByAiTaskStatus(code: Int): TaskStatusViewEnum {
            return entries.firstOrNull { it.aiTaskStatusList.contains(TaskStatusEnum.of(code)) }
                ?: throw IllegalArgumentException("TaskStateWebEnum not found by code $code")
        }

        /**
         * 根据aigcTaskState code 获取枚举 Desc
         */
        fun getDescByAiTaskStatus(code: Int): String {
            return getByAiTaskStatus(code).desc
        }


    }

}
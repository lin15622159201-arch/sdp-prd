package tech.tiangong.sdp.utils

import org.springframework.transaction.support.TransactionSynchronization
import org.springframework.transaction.support.TransactionSynchronizationManager
import java.util.concurrent.Executor

/**
 * 事务工具
 * @author zjh
 * @date 2024/12/26 14:50
 */
class TransactionHelper {

    companion object {

        /**
         * 在事务提交后同步执行
         * @param runnable
         */
        fun afterCommitExecute(runnable: Runnable) {
            if (TransactionSynchronizationManager.isActualTransactionActive()) {
                TransactionSynchronizationManager.registerSynchronization(object : TransactionSynchronization {
                    override fun afterCommit() {
                        runnable.run();
                    }
                });
            } else {
                runnable.run();
            }
        }

        /**
         * 在事务提交后异步执行
         * @param runnable
         */
        fun afterCommitAsyncExecute(executor: Executor, runnable: Runnable) {
            if (TransactionSynchronizationManager.isActualTransactionActive()) {
                TransactionSynchronizationManager.registerSynchronization(object : TransactionSynchronization {
                    override fun afterCommit() {
                        executor.execute(runnable);
                    }
                });
            } else {
                executor.execute(runnable);
            }
        }
    }

}

package tech.tiangong.sdp.component;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;

import java.util.function.Supplier;

/**
 * TransactionalManager
 **/
@Slf4j
@Component
public class JavaTransactionalManager {

    /**
     * 事务执行
     */
    @Transactional(rollbackFor = Exception.class)
    public <R> void exec(Supplier<R> supplier) {
        supplier.get();
    }


    /**
     * 存在事务 => 事务成功提交后执行
     * 不存在事务 => 立即执行
     */
    public void afterCommit(Action action) {
        try {
            boolean active = TransactionSynchronizationManager.isActualTransactionActive();
            if (active) {
                TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
                    @Override
                    public void afterCommit() {
                        action.run();
                    }
                });
            } else {
                action.run();
            }
        } catch (Exception e) {
            log.error("afterCommit执行异常\t{}",e.getLocalizedMessage(),e);
        }
    }

    @FunctionalInterface
    public interface Action {
        void run();
    }
}

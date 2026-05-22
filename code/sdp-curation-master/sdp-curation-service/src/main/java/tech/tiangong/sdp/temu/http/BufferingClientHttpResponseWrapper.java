package tech.tiangong.sdp.temu.http;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.lang.Nullable;
import org.springframework.util.StreamUtils;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

/**
 * BufferingClientHttpResponseWrapper
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/25 18:08
 */
class BufferingClientHttpResponseWrapper implements ClientHttpResponse {

    private final ClientHttpResponse response;

    @Nullable
    private byte[] body;


    BufferingClientHttpResponseWrapper(ClientHttpResponse response) {
        this.response = response;
    }


    @Override
    public HttpStatusCode getStatusCode() throws IOException {
        return this.response.getStatusCode();
    }

    @Override
    public String getStatusText() throws IOException {
        return this.response.getStatusText();
    }

    @Override
    public HttpHeaders getHeaders() {
        return this.response.getHeaders();
    }

    @Override
    public InputStream getBody() throws IOException {
        if (this.body == null) {
            this.body = StreamUtils.copyToByteArray(this.response.getBody());
        }
        return new ByteArrayInputStream(this.body);
    }

    @Override
    public void close() {
        this.response.close();
    }
}

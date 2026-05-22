package tech.tiangong.sdp.req.inspiration

import jakarta.validation.constraints.NotEmpty


data class InspirationReIdentificationReq(

    @field:NotEmpty(message = "inspirationIds is empty")
    var inspirationIds: List<Long>? = null,
)


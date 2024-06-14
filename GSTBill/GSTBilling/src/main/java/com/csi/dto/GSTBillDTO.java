package com.csi.dto;

import jakarta.validation.constraints.Pattern;

public record GSTBillDTO(

       /* "[a-zA-Z\\s]{4,30}"-Name related to that like we are passing any uppercase/lowercase then also
        able to access it

        a-zA-Z-:Matches any single alphabetic character, either uppercase or lowercase.

        \\s-:Matches any whitespace character, such as space or tab.

        {4,30}-: it means the pattern [a-zA-Z\\s] should occur between 4 and 30 times.

        */

        @Pattern(regexp = "[a-zA-Z\\s]{4,30}", message = "Please enter customer name")
        String custName,

        long custContact, String custEmail, String custAddress, String custGSTNO,

        @Pattern(regexp = "^[a-zA-Z+,\\s-]+$", message = "Please enter bill description")
        String billDescription,

        @Pattern(regexp = "[0-9]{1,8}", message = "Please enter total amount in integer format")
        String totalAmount
) {
}
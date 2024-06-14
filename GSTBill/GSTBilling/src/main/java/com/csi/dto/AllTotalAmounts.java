package com.csi.dto;


// record-: It provide a more concise way to declare classes whose primary purpose is to hold immutable data.
public record AllTotalAmounts(int allAmount, int allCgstAmount, int allSgstAmount, int allTotalAmount) {
}
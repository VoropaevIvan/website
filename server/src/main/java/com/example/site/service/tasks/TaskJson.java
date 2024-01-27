package com.example.site.service.tasks;

import java.sql.Timestamp;

record TaskJson(
        int id,
        String content,
        Answer answer,
        String numberEGE,
        boolean isOfficial,
        String actuality,
        String difficulty,
        String source,
        int topic,
        String files,
        Timestamp addDate,
        Timestamp lastChangeDate,
        String videoReview,
        String solution
) {
    record Answer(int rows, int cols, String data) {
        @Override
        public String toString() {
            return "{ \"rows\": " + rows +
                   ", \"cols\": " + cols +
                   ", \"data\": \"" + data + "\" }";
        }
    }
}

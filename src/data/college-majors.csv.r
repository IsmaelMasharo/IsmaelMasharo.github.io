library(tidyverse)

df  <- read_csv("src/data/538-college-mayor-economic-guide.csv")
df_head <- df |> head(10)
cat(format_csv(df_head))

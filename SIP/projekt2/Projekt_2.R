require("moments");  require("readxl");  require("kdensity");  
require("car"); require("dgof"); require("graphics");
require("gdata"); require('asbio'); require('rsq'); require(olsrr)

setwd("D:/Studia/SIP/Projekt2/")
data<-read.xls("data.xlsx", sheet ="Dane", verbose=T, method="tab", perl="perl")
attach(data)
attach(data$names)

cor(data[2:7], method="pearson")

model <- lm(city_mpg ~ wheel_base + curb_weight + engine_size + stroke + compression_ratio + horsepower) #all
summary(model)

model <- lm(city_mpg ~ wheel_base + curb_weight + engine_size + compression_ratio + horsepower) #without stroke 
summary(model)

model <- lm(city_mpg ~  curb_weight + engine_size + compression_ratio + horsepower) #without wheel_base
summary(model)

model <- lm(city_mpg ~ wheel_base + engine_size + stroke + compression_ratio + horsepower) #without curb_weight
summary(model)

model <- lm(city_mpg ~ wheel_base + curb_weight + engine_size + stroke + compression_ratio) #without horsepower
summary(model)

model <- lm(city_mpg ~ wheel_base + curb_weight + engine_size + stroke + compression_ratio + horsepower) #all
vif(mod=model)
model <- lm(city_mpg ~ wheel_base + engine_size + stroke + compression_ratio + horsepower) #without curb_weight
vif(mod=model)

model <- lm(city_mpg ~ wheel_base + curb_weight + engine_size + stroke + compression_ratio + horsepower) #all
ols_step_forward_p(model)
ols_step_backward_p(model)



model <- lm(city_mpg ~ wheel_base + curb_weight + engine_size + compression_ratio + horsepower)
res <- model$residuals
shapiro.test(res)

with(data,plot(wheel_base, res))
with(data,plot(curb_weight, res))
with(data,plot(engine_size, res))
with(data,plot(compression_ratio, res))
with(data,plot(horsepower, res))


Box.test(res,lag=1)
Box.test(res,lag=2)
Box.test(res,lag=3)
Box.test(res,lag=4)

#ols_plot_cooksd_bar(model)
ols_plot_cooksd_chart(model)
ols_plot_dfbetas(model)
ols_plot_dffits(model)
ols_plot_resid_stud(model)
ols_plot_resid_lev(model)

data<-read.xls("data.xlsx", sheet ="Zredukowane", verbose=T, method="tab", perl="perl")
attach(data)
attach(data$names)
model <- lm(city_mpg ~   wheel_base + curb_weight + engine_size + compression_ratio + horsepower)
summary(model)
ols_step_forward_p(model)
model <- lm(city_mpg ~  curb_weight + engine_size + compression_ratio + horsepower)
summary(model)



require("moments");  require("readxl");  require("kdensity");  
require("car"); require("dgof"); require("graphics");
require("gdata"); require('asbio'); require('rsq'); require(olsrr)
install.packages("tidyverse")
require("tidyverse")
library(tidyverse)
library(modelr)
library(broom)
install.packages("pscl")
require("pscl")

setwd("D:/Studia/SIP/Projekt3/")
data<-read.xls("data.xlsx", sheet ="heart", verbose=T, method="tab", perl="perl")
attach(data)
attach(data$names)


model1 <- glm(target ~ thalach, family = "binomial", data = data)
data %>% 
  mutate(prob = target) %>% 
  ggplot(aes(thalach, prob)) +
  geom_point(alpha = .15) + 
  geom_smooth(method = "glm", method.args = list(family = "binomial")) +
  ggtitle("Model Regresji Logistycznej") +
  xlab("Maksymalne osi¹gniête têtno") +
  ylab("Prawdopodobieñstwo ataku serca (0-ma³e, 1-du¿e)")
summary(model1)
exp(coef(model1))
confint(model1)
pscl::pR2(model1)["McFadden"]
predict(model1, data.frame(thalach = c(100, 130, 160)), type = "response")
model1_data <- augment(model1) %>% mutate(index = 1:n())
model1_data %>% filter(abs(.std.resid) > 3)
plot(model1, which = 4, id.n = 5)
model1_data %>% top_n(5, .cooksd)


model2 <- glm(target ~ exang, family = "binomial", data = data)
summary(model2)
exp(coef(model2))
predict(model2, data.frame(exang = c(1, 0)), type = "response")    
pscl::pR2(model2)["McFadden"]
anova(model1, model2, test = "Chisq")
model2_data <- augment(model2) %>% mutate(index = 1:n())
model2_data %>% filter(abs(.std.resid) > 1.5)
plot(model2, which = 4, id.n = 5)
model2_data %>% top_n(5, .cooksd)


model3 <- glm(target ~ exang + chol + trestbps + thalach, family = "binomial", data = data)
summary(model3)
list(model1 = pscl::pR2(model1)["McFadden"],
     model2 = pscl::pR2(model2)["McFadden"],
     model3 = pscl::pR2(model3)["McFadden"])
anova(model1, model3, test = "Chisq")
anova(model2, model3, test = "Chisq")
confint(model1)
model3_data <- augment(model3) %>% mutate(index = 1:n())
model3_data %>% filter(abs(.std.resid) > 2)
plot(model3, which = 4, id.n = 5)
model3_data %>% top_n(5, .cooksd)






lm <- lm(formula=chol ~ trestbps)
lm <- lm(formula=chol ~ thalach)
lm <- lm(formula=chol ~ age)
lm <- lm(formula=chol ~ oldpeak)
lm <- lm(formula=chol ~ trestbps + thalach + age)
lm <- lm(formula=chol ~ trestbps + thalach + age + exang)
lm <- lm(formula=chol ~ exang)

lm <- lm(formula=thalach ~ age)
lm <- lm(formula=thalach ~ exang)
lm <- lm(formula=thalach ~ trestbps + chol + age)
lm <- lm(formula=thalach ~ trestbps + chol + oldpeak + exang)
lm <- lm(formula=thalach ~ chol + age + exang)


cor(data, method="pearson")

lm <- lm(formula=thalach ~ oldpeak)
summary(lm)
res <- lm$residuals
qqPlot(res)
boxplot(res)
shapiro.test(res)
Box.test(res,lag=1)
Box.test(res,lag=2)
Box.test(res,lag=3)
Box.test(res,lag=4)
outlierTest(lm)
with(data,plot(oldpeak, thalach))
abline(lm)

#Test T studenta => test istoynoœci Beta0 i Beta1
#Test F => test istotnoœci R^2
#homoskedastycznoœæ - sta³oœc wariancji - wariancja reszt nie zalezy od numeru obserwacji

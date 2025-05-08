
const mongoOperators = {
    ">": "$gt",
    "<": "$lt",
    "=": "$eq",
    ">=": "$gte",
    "<=": "$lte",
    "!=": "$ne",
    "contains": "$regex",
  };
  
  export function buildCondition(condition) {
    const { field, operator, value } = condition;
    const mongoOp = mongoOperators[operator];
  
    if (!mongoOp) throw new Error(`Unsupported operator: ${operator}`);
  
    if (operator === "contains") {
      return {
        [field]: {
          [mongoOp]: value,
          $options: "i", // case-insensitive regex
        },
      };
    }
  
    return {
      [field]: {
        [mongoOp]: value,
      },
    };
  }
  
  export default function parseRuleToMongo(query) {
    if (!query) return {};
  
    if (Array.isArray(query.rules)) {
      const logicOp = query.ruleOperator === "OR" ? "$or" : "$and";
      return {
        [logicOp]: query.rules.map(buildCondition),
      };
    }
  
    return {}; 
  }
  
  
  
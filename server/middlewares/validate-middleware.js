//? await schema.parseAsync(req.body) is the line where you use Zod to validate the request body data against the defined schema.

// https://github.com/colinhacks/zod#parseasync

// `.parse(data: unknown): T`

// Given any Zod schema, you can call its `.parse` method to check `data` is valid. If it is, a value is returned with full type information! Otherwise, an error is thrown.

// `.parseAsync(data:unknown): Promise<T>`

// If you use asynchronous [refinements](https://github.com/colinhacks/zod#refine) or [transforms](https://github.com/colinhacks/zod#transform) (more on those later), you'll need to use `.parseAsync`.

const validate = (schema) => async (req, res, next) => {
  try {
    const parsedBody = await schema.parseAsync(req.body);
    req.body = parsedBody;
    console.log(parsedBody);
    
    next();
  } catch (err) {
    console.error(err); // Log the entire error for debugging

    // Check if err.errors exists and is an array before accessing its elements
    const status = 400;
    const message = "Invalid input data";
    const extraDetails = err.errors?.length ? err.errors.map((e) => e.message) : ["Something went wrong"];

    return res.status(status).json({
      status,
      message,
      errors: extraDetails,
    });
  }
};

module.exports = validate;

  